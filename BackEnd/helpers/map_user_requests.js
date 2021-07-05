/**
 * Map request data with given object
 * @param {object} user 
 * @param {object} userData 
 * @returns {object}
 */

module.exports = function(user, userData){
    
    if(userData.name)
        user.name = userData.name;
    if(userData.password)
        user.password = userData.password;
    if(userData.username)
        user.username = userData.username;
    if(userData.email)
        user.email = userData.email;
    if(userData.phoneNumber)
        user.phoneNumber = userData.phoneNumber;
    if(userData.gender)
        user.gender = userData.gender;
    if(userData.dob)
        user.dob = userData.dob;
    if(!user.address)
        user.address = {}
    if(userData.tempAddress) 
        user.address.tempAddress = userData.tempAddress.split(",");
    if(userData.permanentAddress)
        user.address.permanentAddress = userData.permanentAddress;
    if(userData.image)
        user.image = userData.image;
        
    return user;
}