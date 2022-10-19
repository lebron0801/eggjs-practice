'use strict';

const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    /**
     * 获取客户端信息
     * @param {string} clientId 客户端编号
     * @param {string} clientSecret 客户端密钥
     * @return {Object} 客户端信息
     */
    async getClient(clientId, clientSecret) {
      try {
        // 1.从数据库中查询客户端信息
        const client = await this.ctx.model.OauthClient.findOne({
          where: { clientId },
        });
        if (!client) return false;

        // 2. 校验客户端密钥，如果前端传了就校验，不传不校验
        if (clientSecret && clientSecret !== client.clientSecret) {
          return false;
        }

        return {
          id: client.clientId,
          redirectUris: client.redirectUri.split(','),
          grants: client.grants.split(','),
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 获取用户信息
     * @param {*} username 账号
     * @param {*} password 密码
     * @return {Object} 用户编号
     */
    async getUser(username, password) {
      try {
        // 校验此用户是否存在
        const user = await this.ctx.model.User.findOne({
          where: { username },
        });
        if (!user) return false;

        // 校验用户密码是否正确，此处是由于库中不存储明文密码
        if (!bcrypt.compareSync(password, user.password)) {
          return false;
        }

        return {
          id: user.userId,
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 自定义生成token
     * @param {string} client 客户端信息
     * @param {object} user 用户信息
     * @param {string} scope 范围
     */
    async generateAccessToken(client, user, scope) {
      const secretKey = 'test';
      const expiresIn = 2 * 60 * 60; // 2h
      const uid = user.id;

      const token = jwt.sign(
        {
          uid,
          scope,
        },
        secretKey,
        {
          expiresIn,
        }
      );

      return token;
    }

    /**
     * 获取访问令牌信息。
     * @param {*} accessToken 要查询的访问令牌
     * @return {*} object
     * @memberof Model
     */
    async getAccessToken(accessToken) {
      try {
        const token = await this.ctx.model.OauthToken.findOne({
          where: { accessToken },
        });
        if (!token) return;

        // 返回数据后，插件底层会进行有效期校验
        return {
          accessToken: token.accessToken,
          accessTokenExpiresAt: new Date(token.accessTokenExpiresAt),
          scope: token.scope,
          client: {
            id: token.clientId,
          },
          user: {
            id: token.userId,
          },
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 保存 token 令牌，包括访问令牌和刷新令牌。
     * @param {*} token 要保存的 token 令牌
     * @param {*} client 客户端信息
     * @param {*} user 用户信息
     * @return {*} token信息
     */
    async saveToken(token, client, user) {
      try {
        const accessToken = await this.ctx.model.OauthToken.create({
          id: uuid.v4(),
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          clientId: client.id,
          userId: user.id,
          scope: token.scope || '',
        });

        const refreshToken = await this.ctx.model.OauthRefreshToken.create({
          id: uuid.v4(),
          refreshToken: token.refreshToken,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          clientId: client.id,
          userId: user.id,
          scope: token.scope || '',
        });

        return {
          accessToken: accessToken.accessToken,
          accessTokenExpiresAt: accessToken.accessTokenExpiresAt,
          refreshToken: refreshToken.refreshToken,
          refreshTokenExpiresAt: refreshToken.refreshTokenExpiresAt,
          client: { id: accessToken.clientId },
          user: { id: accessToken.userId },
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 获取刷新令牌信息
     * @param {string} refreshToken 刷新令牌
     * @return {*} 状态
     */
    async getRefreshToken(refreshToken) {
      try {
        const refToken = await this.ctx.model.OauthRefreshToken.findOne({
          where: { refreshToken },
        });
        if (!refToken) return;

        return {
          refreshToken: refToken.refreshToken,
          refreshTokenExpiresAt: new Date(refToken.refreshTokenExpiresAt),
          scope: refToken.scope,
          client: { id: refToken.clientId },
          user: { id: refToken.userId },
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 销毁刷新token
     * @param {string} token 刷新token
     * @return {boolean | Object} 状态
     */
    async revokeToken(token) {
      try {
        return await this.ctx.model.OauthRefreshToken.destroy({
          where: {
            refreshToken: token.refreshToken,
          },
        });
      } catch (err) {
        return false;
      }
    }

    /**
     * 保存授权码
     * @param {Object} code 授权码信息
     * @param {Object} client 客户端信息
     * @param {Object} user 用户信息
     * @return {Object} 授权码信息
     */
    async saveAuthorizationCode(code, client, user) {
      try {
        const authCode = await this.ctx.model.OauthCode.create({
          id: uuid.v4(),
          code: code.authorizationCode,
          expiresAt: code.expiresAt,
          redirectUri: code.redirectUri,
          scope: code.scope || '',
          clientId: client.id,
          userId: user.id,
        });

        return {
          authorizationCode: authCode.code,
          expiresAt: authCode.expiresAt,
          redirectUri: authCode.redirectUri,
          scope: authCode.scope,
          client: { id: authCode.clientId },
          user: { id: authCode.userId },
        };
      } catch (err) {
        return false;
      }
    }

    /**
     * 吊销授权码信息
     * @param {String} code 授权码
     * @return {*} 状态
     */
    async revokeAuthorizationCode(code) {
      try {
        return await this.ctx.model.OauthCode.destroy({
          where: {
            code: code.code,
          },
        });
      } catch (err) {
        return false;
      }
    }

    /**
     * 获取授权码信息
     * @param {*} authorizationCode 授权码
     * @return {Object} 授权码信息
     */
    async getAuthorizationCode(authorizationCode) {
      try {
        // 1. 从数据库中查询授权码信息
        const authCode = await this.ctx.model.OauthCode.findOne({
          where: {
            code: authorizationCode,
          },
        });

        if (!authCode) return false;

        // 2. 从数据库中查询用户信息
        const user = await this.ctx.model.User.findOne({
          where: { userId: authCode.userId },
        });
        if (!user) return false;

        return {
          code: authCode.code,
          expiresAt: new Date(authCode.expiresAt),
          redirectUri: authCode.redirectUri,
          scope: authCode.scope,
          client: { id: authCode.clientId },
          user: { id: authCode.userId },
        };
      } catch (err) {
        return false;
      }
    }
  }

  return Model;
};
