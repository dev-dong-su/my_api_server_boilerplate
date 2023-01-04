const MESSAGE = {
  /**
   * 로그인 회원가입 관련 오류
   */
  SIGNIN_SUCCEED: '회원가입이 완료되었습니다.',
  COMPLEAT_FORMAT: '모든 항목을 완성시켜 주세요.',

  EMAIL_ALREADY_EXIST: '이미 존재하는 이메일입니다.',
  EMAIL_ERROR: '이메일 형식이 올바르지 않습니다.',
  EMAIL_NOT_FOUND: '존재하지 않는 이메일 입니다.',

  USERNAME_ERROR: '이름은 2자리 이상 써주세요',
  USER_NOT_MATCH: '회원정보가 올바르지 않습니다.',
  USER_ALREADY_EXIST: '이미 존재하는 회원입니다.',
  USER_NOT_ACTIVATED: '비활성화 계정입니다.',
  USER_NOT_FOUND: '존재하지 않는 회원정보 입니다.',

  LOGIN_SUCCEED: '성공적으로 로그인이 완료되었습니다.',
  LOGIN_FAILD: '비밀번호가 잘못되었습니다.',
  RE_LOGIN: '다시 로그인 해주세요.',
  LOGOUT_CONFIRM: '정말 로그아웃 하시겠습니까 ?',

  PASSWORD_ERROR: '비밀번호가 8자 이상인지 확인해 주세요.',
  PASSWORD_CHECK_ERROR: '비밀번호가 같지 않습니다.',

  /**
   * 인증관련 오류
   */
  PRIVATE_ROUTE: '로그인 후에 이용가능한 페이지 입니다.',
  AUTHENTICATION_ERROR: '권한이 없습니다.',
  TOKEN_NOT_FOUND: '토큰이 없습니다.',

  /**
   * 기타 오류
   */
  BAD_REQUEST: '잘못된 요청입니다',
};

module.exports = { MESSAGE };
