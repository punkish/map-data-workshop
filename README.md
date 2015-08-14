# map-data-workshop
A workshop leading up to [epiSTEME 6](http://episteme6.hbcse.tifr.res.in/) in Mumbai

## Objectives
This workshop will provide an overview of the current state of mapping technologies, teach the basics of data collection, management, and dissemination including building databases, APIs, and applications for education and citizen science. Additionally, by fully understanding what makes today's applications do their magic, the attendees will also learn about the legal hurdles that have to be overcome to access and reuse data, and the steps they can take to minimize or eliminate such hurdles.

## Learner Level
This is a hands-on intermediate-to-advanced workshop to learn how to create map-based data analysis and visualization applications. It will introduce and take you through advanced concepts in data acquisition, management and use, and also legal aspects (open source vs. proprietary), but we don't want to classify the workshop as *advanced* because the apps you will build will not be suitable for launching a company and becoming a millionaire. However, you will certainly learn enough to build your own apps for **education** and **citizen science** purposes.

## Prerequisites
#### Participants
+ Have own laptop with ````nodejs````, ````npm````, and a code editor of your choice installed (and XCode, if you have a Mac)
+ Familiarity with Unix-style commands
+ Working knowledge of JavaScript, server-side a plus
+ Knowledge of HTML and CSS
+ Desire to build open source web mapping applications

#### Presenters
+ A way to distribute workshop resources sans internet
+ A list of necessary materials and resources
+ Web based slides, when applicable


## Goal

Our goal is to not just teach you about the technology and workflow but also the associated legal issues, and in that process, hopefully help you appreciate why being open and collaborating with others is very important when working on the web.

By the end of the workshop, participants should:

+ Understand how to create an interactive map from various data sources
+ Be familiar with the legal issues surrounding data acquisition, manipulation, and use
+ Know how to choose a license
+ Be able to debug a web mapping application
+ Work collaboratively on coding projects
+ Know how to choose a data dissemination method
+ Be able to conceptualize a full stack web application


## Duration

The full workshop will last five days, with the structure as shown below:

### Day 1: Introduction

<table>
	<thead>
		<tr>
			<th width="30%">Time</th>
			<th>Activity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>09:00 AM-09:30 AM</td>
			<td>Intro and goals<br>
				<i>Who we are and workshop goals</i>
			</td>
		</tr>
		<tr>
			<td>09:30 AM-10:30 AM</td>
			<td>Overview of the web mapping workflow and stack<br>
				<i>How to go from data to a sharable URL</i>
			</td>
		</tr>
		<tr>
			<td>10:30 AM-11:00 AM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>11:00 AM-12:30 PM</td>
			<td>Overview of the technologies of the stack<br>
				<i>Introduce the variety of technologies that can be used in each piece of the stack—libraries such as jQuery vs. an MVC vs. rolling your own, different backends and why you might use each</i>
			</td>
		</tr>
		<tr>
			<td>12:30 PM-02:00 PM</td>
			<td><i>lunch</i></td>
		</tr>
		<tr>
			<td>02:00 PM-03:30 PM</td>
			<td>Dissecting a mapping app<br>
				<i>Demonstrate mapping apps, and also introduce browser-based dev tools for dissecting and debugging. After a couple of examples, point the class to the URL of a mapping app and have them figure out which technology it uses and how it is assembled.</i>
			</td>
		</tr>
		<tr>
			<td>03:30 PM-04:00 PM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>04:00 PM-05:30 PM</td>
			<td>Technologies behind a mapping app<br>
				<i>Computer preparation, installation of software nodejs, PostGIS, git, Github, environment, setting up a repository, QGIS, GDAL</i>
			</td>
		</tr>
	</tbody>
</table>

### Day 2: Working Collaboratively

<table>
	<thead>
		<tr>
			<th width="30%">Time</th>
			<th>Activity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>09:00 AM-10:30 AM</td>
			<td>git and Github<br>
				<i>all about version control and social coding</i>
			</td>
		</tr>
		<tr>
			<td>10:30 AM-11:00 AM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>11:00 AM-12:30 PM</td>
			<td>Asking questions, finding answers<br>
				<i>Stackoverflow, mailing lists</i>
			</td>
		</tr>
		<tr>
			<td>12:30 PM-02:00 PM</td>
			<td><i>lunch</i></td>
		</tr>
		<tr>
			<td>02:00 PM-03:30 PM</td>
			<td>Project websites<br>
				<i>Telling the world about your work</i>
			</td>
		</tr>
		<tr>
			<td>03:30 PM-04:00 PM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>04:00 PM-05:30 PM</td>
			<td>Working collaboratively in the open<br>
				<i>Why communities matter</i>
			</td>
		</tr>
	</tbody>
</table>

### Day 3: Data, data, data

<table>
	<thead>
		<tr>
			<th width="30%">Time</th>
			<th>Activity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>09:00 AM-10:30 AM</td>
			<td>Data acquisition<br>
				<i>Where to find data. Portals, APIs, scraping.</i>
			</td>
		</tr>
		<tr>
			<td>10:30 AM-11:00 AM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>11:00 AM-12:30 PM</td>
			<td>Data manipulation<br>
				<i>The basics of Extraction-Transformation-Loading (ETL)</i>
			</td>
		</tr>
		<tr>
			<td>12:30 PM-02:00 PM</td>
			<td><i>lunch</i></td>
		</tr>
		<tr>
			<td>02:00 PM-03:30 PM</td>
			<td>Data storage<br>
				<i>Choosing the correct storage method. Databases, flat files, etc.</i>
			</td>
		</tr>
		<tr>
			<td>03:30 PM-04:00 PM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>04:00 PM-05:30 PM</td>
			<td>Legal considerations and hurdles of data<br>
				<i>How to not get in trouble</i>
			</td>
		</tr>
	</tbody>
</table>

### Day 4: Web Apps

<table>
	<thead>
		<tr>
			<th width="30%">Time</th>
			<th>Activity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>09:00 AM-10:30 AM</td>
			<td>Filtering and querying data<br>
				<i>Making sense of data</i>
			</td>
		</tr>
		<tr>
			<td>10:30 AM-11:00 AM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>11:00 AM-12:30 PM</td>
			<td>Building a web map<br>
				<i>A "hello world" web map, three ways</i>
			</td>
		</tr>
		<tr>
			<td>12:30 PM-02:00 PM</td>
			<td><i>lunch</i></td>
		</tr>
		<tr>
			<td>02:00 PM-03:30 PM</td>
			<td>Creating APIs<br>
				<i>Why you don't always want to use static files</i>
			</td>
		</tr>
		<tr>
			<td>03:30 PM-04:00 PM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>04:00 PM-05:30 PM</td>
			<td>Retooling the web app to work with APIs<br>
				<i>The basics of AJAX</i>
			</td>
		</tr>
	</tbody>
</table>

### Day 5: Mobile Apps

<table>
	<thead>
		<tr>
			<th width="30%">Time</th>
			<th>Activity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>09:00 AM-10:30 AM</td>
			<td>Building a phone app<br>
				<i>Using <a href="http://ionicframework.com" target="_blank">Ionic Framework</a> to create cross platform mapping apps with open source web technologies.</i>
			</td>
		</tr>
		<tr>
			<td>10:30 AM-11:00 AM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>11:00 AM-12:30 PM</td>
			<td>Building a phone app… <i>contd.</i></td>
		</tr>
		<tr>
			<td>12:30 PM-02:00 PM</td>
			<td><i>lunch</i></td>
		</tr>
		<tr>
			<td>02:00 PM-03:30 PM</td>
			<td>Building a phone app… <i>contd.</i></td>
		</tr>
		<tr>
			<td>03:30 PM-04:00 PM</td>
			<td><i>break</i></td>
		</tr>
		<tr>
			<td>04:00 PM-05:30 PM</td>
			<td>URIs matter<br>
				<i>bookmark, give credit, cite, return, all possible only because of the URI</i>
			</td>
		</tr>
	</tbody>
</table>
