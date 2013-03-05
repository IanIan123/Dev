using System;
using System.Collections.Generic;
using O2.DotNetWrappers.ExtensionMethods;

namespace TeamMentor.CoreLib
{
    public static class TM_UserData_Ex_ActiveSessions
    {   
        public static Guid              login_Using_LoginToken (this TM_UserData userData, string username, Guid loginToken)
        {
            try
            {
                if (username.valid() && loginToken != Guid.Empty)
                {
                    var tmUser = userData.tmUser(username);
                    if (tmUser.notNull())
                    {
                        if (tmUser.SecretData.SingleUseLoginToken == loginToken)
                        {
                            tmUser.SecretData.SingleUseLoginToken = Guid.Empty;
                            tmUser.logUserActivity("SingleUseLoginToken used", loginToken.str());
                            return tmUser.login();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ex.log("[TM_Xml_Database] login_Using_LoginToken"); 
            }
            return Guid.Empty;    			
        }
        public static Guid              login (this TM_UserData userData, string username, string password)
        {
            try
            {                
                if (username.valid() && password.valid())
                {
                    var tmUser = userData.tmUser(username);

                    if (tmUser.notNull())
                    {
                        if (tmUser.account_Expired())
                        {
                            tmUser.logUserActivity("Account Expired", tmUser.UserName);
                            return Guid.Empty;
                        }

                        var sessionId = (tmUser.SecretData.PasswordHash == tmUser.createPasswordHash(password))
                                            ? Guid.NewGuid()
                                            : Guid.Empty;
                        return tmUser.login(sessionId);                        
                    }
                }
            }
            catch (Exception ex)
            {
                ex.log("[TM_Xml_Database] login");                
            }
            return Guid.Empty;    			
        }
        public static Guid              login (this TMUser tmUser)                                         
        {
            return tmUser.login(Guid.NewGuid());
        }        
        public static Guid              login (this TMUser tmUser, Guid sessionId)                         
        {
            return TM_UserData.Current.login(tmUser, sessionId);
        }
        public static Guid              login (this TM_UserData userData,TMUser tmUser, Guid sessionId)    
        {
            try
            {
                if (tmUser.notNull())
                {
                    if (sessionId != Guid.Empty)
                    {
                        tmUser.Stats.LastLogin = DateTime.Now;
                        tmUser.Stats.LoginOk++;
                        tmUser.logUserActivity("User Login", tmUser.UserName);
                        userData.ActiveSessions.add(sessionId, tmUser);

                        SendEmails.SendEmailAboutUserToTM("Loggged In", tmUser);
                        return sessionId;
                    }
                    tmUser.logUserActivity("Login Fail (bad pwd)", tmUser.UserName);
                    tmUser.Stats.LoginFail++;
                }
            }
            catch (Exception ex)
            {
                ex.log("[TM_UserData][login]");
            }
            return Guid.Empty;
        }
        public static bool              logout(this TMUser tmUser)
        {
            return tmUser.logout(tmUser.session_sessionId());
        }
        public static bool              logout(this Guid sessionId)                                        
        {
            return sessionId.session_TmUser()
                            .logout(sessionId);
        }
        public static bool              logout(this TMUser tmUser, Guid sessionId)                         
        {
            return TM_UserData.Current.logout(tmUser, sessionId);
        }
        public static bool              logout(this TM_UserData userData, TMUser tmUser, Guid sessionId)   
        {
            try
            {
                if (tmUser.notNull() && sessionId.validSession())
                {
                    tmUser.logUserActivity("User Logout", tmUser.UserName);                    
                    userData.ActiveSessions.Remove(sessionId);

                    SendEmails.SendEmailAboutUserToTM("Logged Out", tmUser);
                    return true;
                }
            }
            catch (Exception ex)
            {
                ex.log("[TM_UserData] invalidateSession");
            }
            return false;
        }
                     
        public static bool              validSession         (this Guid sessionId)
        {
            try
            {
                return TM_UserData.Current.ActiveSessions.hasKey(sessionId);
            }
            catch (Exception ex)
            {
                ex.log("[TM_UserData] validSession");                
            }             
            return false;
        }
        public static TMUser            session_TmUser       (this Guid sessionId)
        {
            try
            {
                if(sessionId.validSession())
                    return TM_UserData.Current.ActiveSessions[sessionId];
            }
            catch (Exception ex)
            {
                ex.log("[TM_UserData] session_TmUser");
            }
            return null;	
        }
        public static string            session_UserName     (this Guid sessionId)
        {			
            if(sessionId.validSession())
                return sessionId.session_TmUser().UserName;
            return null;
        }
        public static int               session_GroupID      (this Guid sessionId)
        { 
            var tmUser = sessionId.session_TmUser();
            if (tmUser != null)
                return tmUser.GroupID;
            return -1;            
        }        
        public static UserGroup         session_UserGroup    (this Guid sessionId)
        {
            return (UserGroup)sessionId.session_GroupID();              
        }        
        public static List<UserRole>    session_UserRoles    (this Guid sessionId)
        {
            try
            { 
                var userGroup = sessionId.session_UserGroup();
                if (UserRolesMappings.Mappings.hasKey(userGroup))
                    return UserRolesMappings.Mappings[userGroup];
            }
            catch (Exception ex)
            {
                ex.log("[TM_UserData] session_UserRoles");
            }            
            return new List<UserRole>();
        }        
        public static bool              session_isAdmin      (this Guid sessionId)
        {
            return UserGroup.Admin == sessionId.session_UserGroup();
        }  
        public static Guid              session_sessionId    (this TMUser tmUser)
        {
            try
            {
                foreach(var item in TM_UserData.Current.ActiveSessions)
                    if (item.Value == tmUser)
                        return item.Key;                
            }
            catch (Exception ex)
            {
                ex.log();                
            }
            return Guid.Empty;
        }        
    }
}