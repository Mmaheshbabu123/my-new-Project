

function checkAccess(type){
    var uid = '';
    if (localStorage.getItem('current_user') != null) {
        var user = JSON.parse(localStorage.getItem('current_user'));
        if(user.uid && user.uid != ''){
            uid = user.uid;
            switch (type) {
                case 'planning':
                    
                    break;
            
                default:
                    break;
            }

        }
        return uid;
    } else {
        return '';
    }

}

export const AuthUser = {
    checkAccess

};