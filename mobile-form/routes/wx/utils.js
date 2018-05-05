
const AuthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

const AccessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";

const RefreshTokenUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN ";

const UserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN ";

module.exports = {
  getAuthUrl(appId, redirectUrl) {
    return AuthUrl.replace('APPID', appId)
    .replace('REDIRECT_URI', encodeURIComponent(redirectUrl));
  },
  getAccessTokenUrl(appId, secret, code) {
    return AccessTokenUrl.replace('APPID', appId)
    .replace('SECRET', secret)
    .replace('CODE', code);
  },
  getRefreshTokenUrl(appId, refreshToken) {
    return RefreshTokenUrl.replace('APPID', appId)
    .replace('REFRESH_TOKEN', refreshToken);
  },
  getUserInfoUrl(accessToken, openId) {
    return UserInfoUrl.replace('ACCESS_TOKEN', accessToken)
    .replace('OPENID', openId);
  }

};