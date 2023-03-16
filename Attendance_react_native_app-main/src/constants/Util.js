export default{
    _validateEmail(email) {
		const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	},

    _validatePhone(phone) {
		if (phone && phone[0] != '0') {
			phone = 0 + phone
		}
		const re = /(09|03|01[2|6|8|9])+([0-9]{8})\b/g;
		return re.test(phone);
	},

    _isStringEmpty(text) {
		return text === undefined || text === null || text === '';
	},
}