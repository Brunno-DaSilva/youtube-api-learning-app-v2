class JQueryPlayList extends React.Component {
  state = {
    baseURL: "https://www.googleapis.com/youtube/v3/playlistItems?part=",
    part: "snippet" + "&",
    maxResults: "maxResults=5" + "&",
    playlistId: "playlistId=" + "PLillGF-RfqbYJVXBgZ_nA7FTAAEpp_IAc",
    apikey: "&key=" + "AIzaSyCIETFoL5hBS644jAwQ7vx_79ogETBt4nE",
    videoIds: [],
    finalURL: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  componentWillMount = () => {
    let finalURL =
      this.state.baseURL +
      this.state.part +
      this.state.maxResults +
      this.state.playlistId +
      this.state.apikey;

    fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const videoIds = responseJson.items.map(
          (obj) =>
            "https://www.youtube.com/embed/" + obj.snippet.resourceId.videoId
        );
        this.setState({ videoIds });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="frames-container">
          {this.state.videoIds.map((link, index) => {
            let frame = (
              <div className="frame-wrapper jQueryPlaylist">
                <iframe
                  src={link}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            );
            return frame;
          })}
        </div>

        <div>{this.frame}</div>
        <Comments />
      </React.Fragment>
    );
  }
}
