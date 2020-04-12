import { MsalAuthProvider, LoginType } from "react-aad-msal"

const authProvider = new MsalAuthProvider({
    auth:{
        clientId: 'd9ca585f-7e82-481d-bace-a4f141d7fd90',
        authority:'https://login.microsoftonline.com/common' ,
        postLogoutRedirectUri:'http://localhost:3000/'
    }
},
{
    scopes: ["openid", "offline_access", "https://graph.microsoft.com/mail.read"]
},
{
    loginType:LoginType.Popup
})
export {authProvider}