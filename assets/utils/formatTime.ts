import parseTime from './parseTime';

const ONE_DAY = 86400;

export default function formatTime(value: number): string {
  const { lang, timeFormat } = Craft.timepickerOptions;
  const [h, m, s] = parseTime(value);
  const time = new Date(1970, 0, 2, h, m, s, 0);
  let output = '';
  let hour, code;

  for (let i = 0; i < timeFormat.length; i++) {
    code = timeFormat.charAt(i);

    switch (code) {
      case 'a':
        output += time.getHours() > 11 ? lang.pm : lang.am;
        break;

      case 'A':
        output += time.getHours() > 11 ? lang.PM : lang.AM;
        break;

      case 'g':
        hour = time.getHours() % 12;
        output += hour === 0 ? '12' : hour;
        break;

      case 'G':
        hour = time.getHours();
        if (value === ONE_DAY) hour = 24;
        output += hour;
        break;

      case 'h':
        hour = time.getHours() % 12;
        if (hour !== 0 && hour < 10) {
          hour = '0' + hour;
        }

        output += hour === 0 ? '12' : hour;
        break;

      case 'H':
        hour = time.getHours();
        if (value === ONE_DAY) hour = 24;
        output += hour > 9 ? hour : '0' + hour;
        break;

      case 'i':
        const minutes = time.getMinutes();
        output += minutes > 9 ? minutes : '0' + minutes;
        break;

      case 's':
        const seconds = time.getSeconds();
        output += seconds > 9 ? seconds : '0' + seconds;
        break;

      case '\\':
        // escape character; add the next character and skip ahead
        i++;
        output += timeFormat.charAt(i);
        break;

      default:
        output += code;
    }
  }

  return output;
}
