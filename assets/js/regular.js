var emailRegular=/^([a-z0-9\.]+)([@]{1}[a-z]{3,}[\.]{1}(edu[\.])?(com|rs|org|net))$/,
    passwordRegular=/^(?=.*\d)(?=.*[a-zšžđćč])(?=.*[A-ZŠŽĐĆČ])[0-9a-zšžđćčA-ZŠŽĐĆČ]{8,}$/,
    nameRegular=/^[A-ZŠŽĐĆČ]{1}[a-zšžđćč]{2,}$/,
    naslovRegular=/^[A-zŠšŽžĐđĆćČč0-9\s]{4,}$/,
    textRegular=/[A-zŠšŽžĐđĆćČč\s,0-9\.\?\\\/;\()\n\!]{5,300}/;