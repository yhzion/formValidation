/*!
 * jQuery Form Validation Plugin
 * version: 0.01.10-2015.10.21
 * Requires jQuery v1.9.1 or later
 * Copyright (c) 2015 JEON YOUNG HO
 * Dual licensed under the MIT and GPL licenses.
 */
if (typeof jQuery === 'undefined') {
  throw new Error('JavaScript requires jQuery')
}

+function ($) {
	'use strict';
	var version = $.fn.jquery.split(' ')[0].split('.')
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('JavaScript requires jQuery version 1.9.1 or higher');
	}
}(jQuery);

+function($) {

	$.fn.formValidation = function(options) {

		var settings = $.extend({
			submit: "true"
		}, options);

		console.time('Form validation');

		var result = {
				'$obj':'',
				'fn':'',
				'msg':''
		};

		if($(this).length > 1) {
			throw new Error('폼 요소가 2개 이상 발견되었습니다.');
		} else if($(this).length === 0) {
			throw new Error('폼 요소가 존재하지 않습니다.');
		}

		var validationPreset = {
				'number' : function(val) {
					//console.log('숫자 검증');
					var regExp = /^\d*$/;
					if(!regExp.test(val)) {
						return '이(가) 숫자 형식에 맞지 않습니다.';
					}
					else return '';
				},
				'phone' : function(val) {
					//console.log('전화번호 검증');
					var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
					if(!regExp.test(val)) {
						return '이(가) 전화번호 형식에 맞지 않습니다.';
					}
					else return '';
				},
				'email' : function(val) {
					//console.log('이메일 검증');
					var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
					if(!regExp.test(val)) {
						return '이(가) 이메일 형식에 맞지 않습니다.';
					}
					else return '';

				},
				'yyyymmdd' : function(val) {
					//console.log('날짜 검증(YYYYMMDD)');
					var regExp = /^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
					if(!regExp.test(val)) {
						return '이(가) 날짜(YYYYMMDD) 형식에 맞지 않습니다.';
					}
					else return '';
				},
				'yyyy-mm-dd' : function(val) {
					//console.log('날짜 검증(YYYY-MM-DD)');
					var regExp = /^\d{4}[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/;
					if(!regExp.test(val)) {
						return '이(가) 날짜(YYYY-MM-DD) 형식에 맞지 않습니다.';
					}
					else return '';
				},
				'yyyy' : function(val) {
					//console.log('연도 검증(YYYY)');
					var regExp = /^[12]{1}\d{3}$/;
					if(!regExp.test(val)) {
						return '이(가) 연도 형식에 맞지 않습니다.';
					}
					else return '';
				}
			};

		var $t = $(this).find('input[data-label],textarea[data-label],select[data-label]');

		$t.each(function(){

			var val = $(this).data('val');
			var regexp = $(this).data('regexp');
			var label = $(this).data('label');
			var essl = $(this).data('essl');
			var fn = $(this).data('fn');
			var maxlength = $(this).attr('maxlength');

			/*
			console.log('val : ',val);
			console.log('regexp : ',regexp);
			console.log('label : ',label);
			console.log('placeholder : ',placeholder);
			console.log('essl : ',essl);
			console.log('maxlength : ',maxlength);
			*/

			if(($.trim(label) === '')) {
				throw new Error('data-label attribute의 값이 존재해야 합니다.');
			}

			/* 필수입력체크 true*/
			if(essl === true && $.trim($(this).val())==='') {
				result.$obj = $(this);
				if($(this)[0].tagName.toLowerCase() === 'select') {
					result.msg = label + ' 은(는) 필수선택항목입니다.';
				} else {
					result.msg = label + ' 은(는) 필수입력항목입니다.';
				}

			}
			/* 필수입력체크 false */
			else if((essl !== false || essl === undefined)
					&& $.trim($(this).val())==='') {
				return true;
			}
			/* Data validation 수행*/
			else {
				/* Preset 검증 */
				if((regexp === undefined || regexp === '') && val !== undefined) {

					//console.log('프리셋 검증 : ',val);

					var fn = validationPreset[val];

					if(val !=='' && typeof fn === 'function') {
						var m = fn($(this).val());
						if($.trim(m) !== '') {
							/* 검증 대상 오브젝트 */
							result.$obj = $(this);
							/* 검증 결과 메세지 */
							result.msg = label + ' ' + m;
						}
					} else {
						throw new Error('존재하지 않는 프리셋 : ', val);
					}
				}
				/* 정규식 검증 - 정규식이 기술되어 있을 경우 우선됨(프리셋 무시) */
				else if(regexp !== undefined && regexp !== ''){
					//console.log('정규식 검증 : ', regexp);
					if(!$(this).val().match(new RegExp(regexp, "i"))) {
						/* 검증 대상 오브젝트 */
						result.$obj = $(this);
						/* 검증 결과 메세지 */
						result.msg = label + ' ' + '이(가) 형식에 맞지 않습니다.';
					}
				}
				/* 길이 체크(byte) */
				else if(maxlength !== undefined && !isNaN(maxlength)) {
					//console.log('길이 검증 : ', maxlength, 'byte');
					var stringByteLength = (function(s,b,i,c){
					    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
					    return b
					})($(this).val());

					//console.log('String byte length : ', stringByteLength);

					if(parseInt(stringByteLength) > parseInt(maxlength)) {
						/* 검증 대상 오브젝트 */
						result.$obj = $(this);
						/* 검증 결과 메세지 */
						result.msg = label + ' ' + '의 최대길이를 초과하였습니다. (최대길이 : '+maxlength+'byte, 현재 : '+stringByteLength+'byte)';
					}
				}
			}

			/* 검증 결과 메세지가 존재하는 경우 each 루프를 빠져나옴 */
			if($.trim(result.msg) != '') {

				result.fn = fn;

				//console.log(result);

				return false;
			}
		});

		if($.trim(result.msg) != '') {

			console.log(result);

			alert(result.msg);
			result.$obj.focus();

			if(result.fn !== undefined && $.trim(result.fn) !== '') {
				eval(result.fn);
			}

			return false;
		} else {
			if(settings.submit) {
				$(this)[0].submit();
			}
			return true;
		}

		console.timeEnd('Form validation');
	};
}(jQuery);