namespace CinemaAPI.Models
{
    public class Cinema
    {
        public int Id { get; set; }
        public string Name { get; set; }
    
        public string Address { get; set; }
    
        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Description { get; set; }

        public string WeekdaysProgram { get; set; }
        public string WeekendProgram { get; set; }
        public string HolidayProgram { get; set; }

    }
}
