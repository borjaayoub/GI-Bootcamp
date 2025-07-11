class Video {
  constructor (title, uploader, time){
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  };

  watch(){
    console.log(`${this.uploader} watched all ${this.time} of ${this.title}`)
  }
}

const video1 = new Video('JavaScript Basics', 'Ayoub', '15 minutes');
video1.watch();

const video2 = new Video('Python for Beginners', 'Youssef', '20 minutes');
video2.watch();

const videosData = [
  { title: 'React Crash Course', uploader: 'Sara', time: '30 minutes' },
  { title: 'Node.js Tutorial', uploader: 'Ali', time: '25 minutes' },
  { title: 'CSS Flexbox Guide', uploader: 'Mona', time: '18 minutes' },
  { title: 'HTML5 Essentials', uploader: 'Omar', time: '22 minutes' },
  { title: 'Advanced Python', uploader: 'Lina', time: '40 minutes' }
];

const videoInstances = videosData.map(videoInfo => new Video(videoInfo.title, videoInfo.uploader, videoInfo.time));
videoInstances.forEach(video => video.watch());

