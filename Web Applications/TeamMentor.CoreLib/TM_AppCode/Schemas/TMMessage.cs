using System;

namespace TeamMentor.CoreLib.TM_AppCode.Schemas
{
    public class TM_Message
    {
        public bool     Status      { get; set; }
        public bool     Authorized  { get; set; }
        public Guid     Guid        { get; set; }
        public string   Message     { get; set; }
    }
}
