using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Timed10MWalkTestApp.Models
{
    public class TestRunModel
    {
        /// <summary>
        /// Key for identifying  a test run
        /// </summary>
        [Key]
        public string testID { get; set; }

        /// <summary>
        /// First run time
        /// </summary>
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Please enter valid float Number")]
        public double RunS1 { get; set; }

        /// <summary>
        /// Second run time
        /// </summary>
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Please enter valid float Number")]
        public double RunS2 { get; set; }

        /// <summary>
        /// Thirdrun time
        /// </summary>
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Please enter valid float Number")]

        public double RunS3 { get; set; }

        /// <summary>
        /// Average per run
        /// </summary>
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Please enter valid float Number")]
        public double averageTimePerRun { get; set; }

        /// <summary>
        /// Prefer vs fast speed
        /// </summary>
        [Required]
        public string testSpeed { get; set; }

        /// <summary>
        /// Average velocity on test
        /// </summary>
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Please enter valid float Number")]
        public double AverageVelocity { get; set; }

        /// <summary>
        /// Any assistive while performing the test
        /// </summary>
        [Required]
        public string assistiveDevice { get; set; }

        /// <summary>
        /// Any notes while performing the test
        /// </summary>
        public string Notes { get; set; }

        /// <summary>
        /// get the date when the test was taken
        /// </summary>
        public DateTime date { get; set; }


        /// <summary>
        /// Each test run will be attributed to a patient
        /// </summary>
        public PatientDataModel Patient { get; set; }



    }
}
