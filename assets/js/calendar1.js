var events =[
    {'Date': new Date(2022,12,24), 'Title': 'Neighborhood watch at 11:30pm.'},
    {'Date': new Date(2022,12,25), 'Title': 'File police report for break-in by overweight man in red coat.  Getaway vehicle driven by someone wearing antlers on their cap.'},
    {'Date': new Date(2022,12,31), 'Title': 'Vow to stop drinking'}
]

//for some reason dayjs is not defined in this instance
//var currentDay = dayjs().date()
var currentDay = Date()
console.log(currentDay)
console.log(events)

dayjs().extend()

dayjs().calendar(null, {
    sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
    nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
    lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
    lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'DD dd/MMM/YYYY' // Everything else ( 7/10/2011 )
  })
  console.log(now());

/*//having trouble with 'require'

//var calendar = require: 'dayjs/plugin/calendar',
var calendar ='dayjs/plugin/calendar',
dayjs.extend(calendar)

dayjs().calendar(dayjs())
dayjs().calendar(null, {
  sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
  nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
  nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
  lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
  lastWeek: '[Last] dddd [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
  sameElse: 'DD dd/MMM/YYYY' // Everything else ( 17/10/2011 )
})
*/
