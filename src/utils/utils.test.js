const mocks = () => {
  const original = require.requireActual('./index');
  
  return {
    ...original,
    _fetch: jest.fn(() => fixtures)
  };
};

const fixtures = [
  {
    "id":"9982824c-efdc-11e7-911d-874b6e87f6d1",
    "created_at":"Tue Jan 02 16:47:43 UTC 2018",
    "title":"Sr. Data Engineer ",
    "location":"San Francisco, CA ",
    "type":"Full Time",
    "description":"At the heart of the CircleCI product offerings is the flow of data.",
  },
  {
    "id":"f00dc824-ec35-11e7-99e6-bcbf86ad3b8e",
    "created_at":"Fri Dec 29 01:17:39 UTC 2017",
    "title":"Senior Data Scientist",
    "location":"San Francisco",
    "type":"Full Time",
    "description":"At VigLink, we believe the future of marketing lies within the untapped potential of digital content covering commercial products across the Web."
  },
  {
    "id":"f1f40790-df5e-11e7-9b60-a032d97c910c",
    "created_at":"Tue Dec 12 17:07:55 UTC 2017",
    "title":"iOS & Full-Stack Engineers for SF Healthcare Startup",
    "location":"San Francisco",
    "type":"Full Time",
    "description":"Lighthouse Labs is a technology company creating a new delivery model for mental health care.",
  }
]

jest.mock('./index', () => mocks());
const utils = require('./index');

describe('utils', () => {
  it('builds a URL', () => {
    expect(utils.buildURL('Python', 'New York', 0)).toEqual('https://jobs.github.com/positions.json?description=python&location=new%20york');
    expect(utils.buildURL('Node', 'Boulder', 1)).toEqual('https://jobs.github.com/positions.json?description=node&location=boulder&page=1');
    expect(utils.buildURL('', 'Boston', 0)).toEqual('https://jobs.github.com/positions.json?location=boston');
    expect(utils.buildURL('JavaScript', '', 2)).toEqual('https://jobs.github.com/positions.json?description=javascript&page=2');
  });

  it('encodes entities', () => {
    expect(utils.encode('Python')).toEqual('python');
    expect(utils.encode('New York')).toEqual('new%20york');
    expect(utils.encode('JavaScript')).toEqual('javascript');
    expect(utils.encode('.NET')).toEqual('.net');
  });

  it('resolves fetched data', () => {
    expect(utils.fetchData({}, 0)).resolves.toEqual(fixtures);
  });
});
