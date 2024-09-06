/**
 * 휴대폰번호 3자리 하이픈
 * @param arg
 * @returns
 */
export const phoneNumWithHyphen = (arg: string): string => {
    return arg.replace(/[^0-9]/g, '').replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
};

/**
 * 휴대폰번호 유형 확인
 * @param arg 
 */
export const phoneNumCheck = (arg: string): boolean => {
    const regExp = /^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/;
    return regExp.test(arg);
}
