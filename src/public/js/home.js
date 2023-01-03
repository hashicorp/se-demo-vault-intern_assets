/**
 * Copyright (c) HashiCorp, Inc.
 */

function showPassword(htmlID) {
    var x = document.getElementById(htmlID);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}