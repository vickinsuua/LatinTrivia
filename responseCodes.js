/* Verification */
const verificationCreated           = {code: 600, message: "Verification code sent"};

const failedVerification            = {code: 601, message: "Failed verification"};

const delayTimeVerification         = {code: 602, message: "Must wait a minute to try again"};

const correctlyVerifiedDevice       = {code: 603, message: "Correctly verified device"};

const VerificationFailed            = {code: 604, message: "Verification Failed"};

const UserFailed                    = {code: 605, message: "User not found"};

/* Profile */
const profileCreated                = {code: 710, message: "The profile was created succefully"};

const profileAlreadyCreated         = {code: 711, message: "The profile was already created"};

const profileUpdated                = {code: 712, message: "The profile was updated succefully"};

const userProfileDoesNotExist       = {code: 713, message: "User profile does not exist"};

const profileNotSaved               = {code: 714, message: "The profile could not be saved"};

const addExtraLifeShare             = {code: 715, message: "Add Extra Life for sharing"};

const faildAddExtraLifeShare             = {code: 715, message: "Add Extra Life for sharing"};

/* Device */
const deviceNotFound                = {code: 813, message: "Device not found"};

const phoneNotFound                 = {code: 814, message: "Phone number not found"};

const deviceVerified                = {code: 815, message: "This device is verified"};

const deviceNotVerified             = {code: 816, message: "This device is not verified"};

/*Wallet*/
const cardNotAdd                    = {code: 913, message: "Could not add card"};

const cardAddedSuccessfully         = {code: 914, message: "Card added successfully"};

const cardsReadSuccessfully         = {code: 915, message: "Cards read successfully"};

const theCardsCouldNotBeRead        = {code: 916, message: "The cards could not be read"};

const balanceAddedSuccessfully      = {code: 917, message: "Balance added successfully"};

const balanceNotAdded               = {code: 918, message: "Balance not added"};

const walletNotFound                = {code: 919, message: "Wallet not found"};

const walletReadSuccessfully         = {code: 920, message: "Wallet read successfully"};


/*Middlewares*/

const AuthFailed                    = {code: 1017, message: "Auth Failed"};

const deviceNotVerifiedApi          = deviceNotVerified;

module.exports = {

   verificationCreated : verificationCreated,

   failedVerification : failedVerification,

   delayTimeVerification : delayTimeVerification,

   correctlyVerifiedDevice : correctlyVerifiedDevice,

   VerificationFailed: VerificationFailed,

   profileCreated : profileCreated,

   profileAlreadyCreated : profileAlreadyCreated,

   profileUpdated : profileUpdated,

   deviceNotFound : deviceNotFound,

   phoneNotFound : phoneNotFound,

   deviceVerified : deviceVerified,

   deviceNotVerified : deviceNotVerified,

   AuthFailed: AuthFailed,

   deviceNotVerifiedApi: deviceNotVerifiedApi,

   userProfileDoesNotExist: userProfileDoesNotExist,

   cardNotAdd: cardNotAdd,

   cardAddedSuccessfully: cardAddedSuccessfully,

   cardsReadSuccessfully: cardsReadSuccessfully,

   theCardsCouldNotBeRead: theCardsCouldNotBeRead,

   profileNotSaved: profileNotSaved,

   balanceAddedSuccessfully: balanceAddedSuccessfully,

   balanceNotAdded: balanceNotAdded,

   walletNotFound: walletNotFound,

   walletReadSuccessfully: walletReadSuccessfully


};