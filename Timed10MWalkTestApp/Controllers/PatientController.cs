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
    public class PatientController : ControllerBase
    {

        protected TimedTestApplicationContext mContext;

        public PatientController(TimedTestApplicationContext context)
        {
            mContext = context;
            context.Database.EnsureCreated();
        }


        /// <summary>
        /// Controller to add new patients to the DB. Input parameter will be the patient to be added.
        /// </summary>
        /// The patient parameter will contain the data for the new patient
        [HttpPost("[action]")]
        public string newPatient(PatientDataModel patient)
        {
            //Add new patient to the DB
            mContext.Add(patient);

            //Save changes on DB 
            mContext.SaveChanges();

            return "1";
        }

        /// <summary>
        /// Controller to search for patients
        /// The string parameter will be used to identify all patients who's name ( full name) contains the string
        /// For example: Say Patient name is omar Cruz pantoja,  the string cruz will identify such patient because the patient name
        /// </summary>
        /// <returns>Will return all patients that contain the string patientName on their name</returns>
        [HttpGet("[action]")]
        public IEnumerable<PatientDataModel> likePatients(string patientName)
        {

            var patients = mContext.Patient
                         .Where(p => p.Name.Contains(patientName));
            return patients;
        }

        /// <summary>
        /// Function to edit information from the patient. The patient model recieved will contain the information to be updated
        /// </summary>
        /// <param name="Patient"></param>
        [HttpPost("[action]")]
        public string editPatient(PatientDataModel Patient)
        {

            //Identify the patient who's information will be edited
            PatientDataModel dp = mContext.Patient.Where(p => p == Patient).First<PatientDataModel>();

            //Edit all the entries necessary
            dp.Email = Patient.Email;

            //Save changes on DB 
            mContext.SaveChanges();

            return "1";
        }

        /// <summary>
        /// Function to delete patient sent by parameter
        /// </summary>
        /// <param name="patient"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public string deletePatient(PatientDataModel patient)
        {
            mContext.Patient.Remove(patient);
            
            //Save changes on DB 
            mContext.SaveChanges();
            return "1";
        }

       /// <summary>
       /// Function to get all patients
       /// </summary>
        [HttpGet("[action]")]
        public IEnumerable<PatientDataModel> getAllPatientData()
        {
            return mContext.Patient;
        }

        

    }
}