export const changePasswordFields = [
    {
        "label": "Old Password",
        "name": "old_password",
        "datatype": "Password",
        "isReq": true,
        "description": {},
        "hidden": 0,
        "readonly": false
    },
    {
        "label": "New Password",
        "name": "new_password",
        "datatype": "Password",
        "isReq": true,
        "description": {type:"password"},
        "hidden": 0,
        "readonly": false
    },
    {
        "label": "Confirm Password",
        "name": "confirm_password",
        "datatype": "Password",
        "isReq": true,
        "description": {type:"confirmPassword"},
        "hidden": 0,
        "readonly": false
    }
]