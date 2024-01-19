function emailIsValid(email) {
    // matches on emails like:
    // something123!>@something123.something
    if(!(/^[^\s@.]+@[^\s@.]+\.[\w]+$/.test(email))) {
        return false;
    }

    return true;
}


function phoneNumberIsValid(number) {
    // matches on numbers like:
    // +# (###) ###-####
    if (!(/^\+\d+ \(\d{3}\) \d{3}-\d{4}$/.test(number))) {
        return false;
    }

    return true;
}

module.exports = { 
    emailIsValid,
    phoneNumberIsValid 
};