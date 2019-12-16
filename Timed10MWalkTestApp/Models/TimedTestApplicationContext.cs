using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timed10MWalkTestApp.Models
{
    public class TimedTestApplicationContext : DbContext
    {

        #region Public Properties
        /// <summary>
        /// Patient model for database
        /// </summary>
        public DbSet<PatientDataModel> Patient { get; set; }

        public DbSet<TestRunModel> TestRun { get; set; }

        #endregion

        #region Constructor
        /// <summary>
        /// Default database 
        /// </summary>
        /// <param name="options"></param>
        public TimedTestApplicationContext() 
        {

        }

    public TimedTestApplicationContext(DbContextOptions<TimedTestApplicationContext> options) : base (options)
        {
            var st = 1;
        }

        #endregion


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{

        //    //Create the database if not created
        //    using (var ctx = new TimedTestApplicationContext())
        //    {
        //        ctx.Database.EnsureCreated();
        //    }


        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TestRunModel>().HasOne(p => p.Patient).WithMany(r => r.Runs).OnDelete(DeleteBehavior.Cascade);
                
        }


    }
}
