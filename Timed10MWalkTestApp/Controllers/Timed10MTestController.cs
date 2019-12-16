using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Timed10MWalkTestApp.Models;

namespace Timed10MWalkTestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Timed10MTestController : ControllerBase
    {

        protected TimedTestApplicationContext mContext;

        public Timed10MTestController(TimedTestApplicationContext context)
        {
            mContext = context;

            context.Database.EnsureCreated();

        }

        [HttpPost("[action]")]
        public string addTestRun(TestRunModel filledForm)
        {
            filledForm.date = DateTime.Now;
            mContext.Patient.Attach(filledForm.Patient);
            mContext.Add(filledForm);
            mContext.SaveChanges();

            return "1";
        }

        [HttpPost("[action]")]
        public IEnumerable<TestRunModel> PatientTestRuns(PatientDataModel patient)
        {

            var runs = mContext.TestRun.Where(r => r.Patient == patient).ToList<TestRunModel>();
                        

            return runs;
        }

        //[HttpGet("[action]")]
        //public IEnumerable<PatientDataModel> PatientTestRun(string filledForm)
        //{
        //    filledForm.date = DateTime.Now;
        //    mContext.Patient.Attach(filledForm.Patient);
        //    mContext.Add(filledForm);
        //    mContext.SaveChanges();

        //    return "1";
        //}

    }
}