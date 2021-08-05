const posts = [
  {
    type: 'video',
    name: 'Hoàng Anh',
    date: '10 minutes ago',
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FHi-Tech%2FHitech_01016.jpg?alt=media&token=d273a981-6c4c-4f51-8b9d-11f95077af91',
    detail: 'Keeping your eye on the ball while performing a deep dive on the start-up mentality.',
    image: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fposts%2Fintro.jpg?alt=media&token=3e08323e-c7f2-43bb-84e1-74c0fc0d1b14',
    video: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fposts%2Fvideos%2FInterior%20Design%20Trends%202021.mp4?alt=media&token=49666a1a-7bd9-43df-a67d-97d7ee374313',
    likeCount: 125,
    commentCount: 3,
    comments: [
      {
        name: 'Trương Bảo',
        detail:
          `Goog chop =)).`,
        date: 'Two hours ago',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(3).jpg?alt=media&token=82932692-58b8-432c-b6e6-db91052c3118',
        likes: 1,
        id: 1
      },
      {
        name: 'Văn Hóa',
        detail: 'Amazing .',
        date: 'Two hours ago',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(6).jpg?alt=media&token=f96c8051-91b7-4dce-a12e-4f5a89ed0821',
        likes: 5,
        id: 2
      }],
    id: 1
  },
  {
    type: 'image',
    name: 'Hoàng Dũng',
    date: '2 hours ago',
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(8).jpg?alt=media&token=3e1bd0a1-1cda-4b72-be89-80214887e0ce',
    detail:
      `Bad !!!!!!`,
    image: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fposts%2Fhitech.jpg?alt=media&token=1bf97689-da1e-48c9-9c5f-1ca2d9805ca0',
    video: '',
    likeCount: 3,
    commentCount: 1,
    comments: [
      {
        name: 'Quốc Dũng',
        detail: 'Disss',
        date: 'Five days ago',
        thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(9).jpg?alt=media&token=ca4486c8-034d-45ba-974d-1b131e495cb9',
        likes: 2,
        id: 4
      }
    ],
    id: 2
  },
  {
    type: 'text',
    name: 'Quốc Huy',
    date: '3 hours ago',
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(4).jpg?alt=media&token=784e7ab3-ac2c-421c-beb8-1a5e59afab10',
    detail:
      `Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail.
      Keeping your eye on the ball while performing a deep dive on the start-up mentality.`,
    image: '',
    video: '',
    likeCount: 28,
    commentCount: 0,
    comments: [],
    id: 3
  },
  {
    type: 'image',
    name: 'Minh Hiếu',
    date: 'A day ago',
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FHi-Tech%2FHitech_00240.jpg?alt=media&token=c12f4c20-a872-418d-a583-acbd9298ad59',
    detail: `So Bad`,
    image: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fposts%2Findochine.jpg?alt=media&token=4f9aeb15-651c-46df-b73a-c216abd6fe73',
    video: '',
    likeCount: 11,
    commentCount: 4,
    comments: [{
      name: 'Uy Dũng',
      detail: 'Badd',
      date: 'Five days ago',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(6).jpg?alt=media&token=f96c8051-91b7-4dce-a12e-4f5a89ed0821',
      likes: 0,
      id: 4
    },
    {
      name: 'Bảo Quốc',
      detail: 'Very Good.',
      date: 'Six days ago',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Fimage%2Favartar%20(2).jpg?alt=media&token=89b26f46-e0aa-4dde-a127-34ae62db4073',
      likes: 14,
      id: 5
    }],
    id: 4
  }
];

export default posts;
