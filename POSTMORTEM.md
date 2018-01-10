# GitHub Job Listings - Postmortem
This serves as a follow-up to the GitHub Job Listings project, recapping challenges
faced, perceived strengths and weaknesses, tradeoffs made, miscellaneous notes.

### Challenges Faced
The GitHub Jobs API returns data in a JSONP format, making programmatic access a
bit more difficult. To further complicate matters, the API doesn't provide any
listing count. I opted for a fetch-like approach for retrieving listings, 
complete with Promise resolutions and async/await patterns. The resolved promise
was then evaulated, allowing me to determine whether or not I needed to execute
another data pull.

### Tradeoffs
This project had a hard limit of 4 hours. In order to stay under the time limit,
I was forced to make some accomodations. The largest tradeoff is in testing. I
limited unit testing to utility functions, blindly trusting React and Redux. With
no data, the appliction is useless. By testing utility functions used to retreive
data, I can ensure all data is present.

Another tradeoff was in design. I opted to develop functionality over form. I 
favored utility over aesthetics because while an ugly application won't sell well,
an unusuable appliction won't sell at all.

The final tradeoff was in the use of
[Create React App](https://github.com/facebookincubator/create-react-app).
**Create React App** is a great resource, but it is a bit too black box for my
liking. I prefer having a little more control over Webpack configurations.

### Perceived Strengths
The greatest strength to this application is in the use of Promise based, 
async/await driven data retrieval. The intent was to make a fetch-like

### Perceived Weaknesses
There is a significant lack of unit testing on this project. I only wrote tests
for utility functions concerning data retrieval, relying on React and Redux to 
render properly. Since most of my components are functional, I could triage the
lack of testing by first adding tests to `actions`. 