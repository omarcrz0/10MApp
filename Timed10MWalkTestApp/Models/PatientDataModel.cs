using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Timed10MWalkTestApp.Models
{

    /// <summary>
    /// Patient database table model
    /// </summary>
    public class PatientDataModel
    {
        /// <summary>
        /// Patient unique id
        /// </summary>
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// Patient Complete name
        /// </summary>
        [MaxLength(256)]
        [Required]
        public string Name { get; set; }

        [MaxLength(16)]
        public string Gender { get; set; }

        [MaxLength(32)]
        [Required]
        public string Email { get; set; }

        //Each patient may have several tests
        public ICollection<TestRunModel> Runs { get; set; }
    }
}
