import db from '../db/db';
import { Service, DataSource, DataEntry } from '../db/models';
/**
 * Generate Date between an interval
 */
function getDates(startDate: Date, endDate: Date) {
  const dates = [];
  let currentDate = startDate;
  const addDays = (curr: Date, days: number) => {
    const date = new Date(curr);
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
}
/**
 * Generate Database data for the API, to simulate real entries
 */
async function seed() {
  await db.sync({ force: true });
  console.log('DB synced!');
  const fb = await Service.create({
    name: 'Facebook',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg',
  });
  const twitter = await Service.create({
    name: 'Twitter',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/sco/9/9f/Twitter_bird_logo_2012.svg',
  });
  const drive = await Service.create({
    name: 'Drive',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
  });
  const dropBox = await Service.create({
    name: 'DropBox',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg',
  });
  const slack = await Service.create({
    name: 'Slack',
    serviceIconUrl: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  });
  const github = await Service.create({
    name: 'GitHub',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  });
  const amazon = await Service.create({
    name: 'Amazon',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
  });
  const gmail = await Service.create({
    name: 'Gmail',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
  });
  const insta = await Service.create({
    name: 'Instagram',
    serviceIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Instagram.svg',
  });
  const data1 = await DataSource.create({
    serviceId: fb.serviceId,
    dataName: 'Ad Revenue',
    dataCurrency: '$',
  });
  const data2 = await DataSource.create({
    serviceId: twitter.serviceId,
    dataName: 'This is a long text to test the ellipsis when the text overflows from the container ',
    dataCurrency: '',
  });
  const data3 = await DataSource.create({
    serviceId: drive.serviceId,
    dataName: 'Number of Downloads',
    dataCurrency: '',
  });
  const data4 = await DataSource.create({
    serviceId: dropBox.serviceId,
    dataName: 'Number of Files',
    dataCurrency: '',
  });
  const data5 = await DataSource.create({
    serviceId: slack.serviceId,
    dataName: 'Notifications',
    dataCurrency: '',
  });
  const data6 = await DataSource.create({
    serviceId: insta.serviceId,
    dataName: 'Number of Likes',
    dataCurrency: '',
  });
  const data7 = await DataSource.create({
    serviceId: github.serviceId,
    dataName: 'PR',
    dataCurrency: '',
  });
  const data8 = await DataSource.create({
    serviceId: amazon.serviceId,
    dataName: 'AMZ',
    dataCurrency: '$',
  });
  const data9 = await DataSource.create({
    serviceId: gmail.serviceId,
    dataName: 'Mails',
    dataCurrency: '',
  });
  const dates = getDates(new Date(2013, 10, 22), new Date(2013, 11, 25));
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data1.dataId,
        dataEntryName: 'Ad Profit',
        dataValue: (Math.random() * (500.6 - 200) + 200).toFixed(2),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data2.dataId,
        dataEntryName: 'Twitts',
        dataValue: (Math.random() * (3000 - 200) + 200).toFixed(0),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data3.dataId,
        dataEntryName: 'DL',
        dataValue: (Math.random() * (20000 - 11000) + 11000).toFixed(0),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data4.dataId,
        dataEntryName: 'Files',
        dataValue: (Math.random() * (20 - 1) + 1).toFixed(0),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data5.dataId,
        dataEntryName: 'Notif',
        dataValue: (Math.random() * (20 - 5) + 5).toFixed(0),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data6.dataId,
        dataEntryName: 'Likes',
        dataValue: (Math.random() * (2000 - 10) + 10).toFixed(0),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data7.dataId,
        dataEntryName: 'Pull Requests',
        dataValue: (Math.random() * (2000 - 1000) + 1000).toFixed(0),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data8.dataId,
        dataEntryName: 'Sales',
        dataValue: (Math.random() * (1500 - 500) + 500).toFixed(2),
        date,
      });
    }),
  );
  await Promise.all(
    dates.map(async (date) => {
      await DataEntry.create({
        dataId: data9.dataId,
        dataEntryName: 'Shares',
        dataValue: (Math.random() * (10000000 - 9000000) + 9000000).toFixed(0),
        date,
      });
    }),
  );

  console.log(`Seeded services and data sources and data entries`);
}

async function runSeed() {
  console.log('Seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('Closing db connection');
    await db.close();
    console.log('DB connection closed');
  }
}

if (module === require.main) {
  runSeed();
}
