import React, {Component} from 'react';
import {RoomWhiteboard, WhiteWebSdk} from 'white-react-sdk';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      room: null
    }
  }

  async componentWillMount() {
    const whiteWebSdk = new WhiteWebSdk();
    const miniToken = 'WHITEcGFydG5lcl9pZD1DYzlFNTJhTVFhUU5TYmlHNWJjbkpmVThTNGlNVXlJVUNwdFAmc2lnPTE3Y2ZiYzg0ZGM5N2FkNDAxZmY1MTM0ODMxYTdhZTE2ZGQ3MTdmZjI6YWRtaW5JZD00JnJvbGU9bWluaSZleHBpcmVfdGltZT0xNTY2MDQwNjk4JmFrPUNjOUU1MmFNUWFRTlNiaUc1YmNuSmZVOFM0aU1VeUlVQ3B0UCZjcmVhdGVfdGltZT0xNTM0NDgzNzQ2Jm5vbmNlPTE1MzQ0ODM3NDYzMzYwMA';

    const url = 'https://cloudcapiv4.herewhite.com/room?token=' + miniToken;
    const requestInit = {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: '我的第一个 White 房间',
        limit: 100, // 房间人数限制
      }),
    };
    const res = await fetch(url, requestInit);
    const json = await res.json();
    const room = await whiteWebSdk.joinRoom({uuid: json.msg.room.uuid, roomToken: json.msg.roomToken});
    this.setState({room: room});
  }

  render() {
    return this.state.room ?
      <RoomWhiteboard room={this.state.room}
                      style={{width: '100%', height: '100vh'}}/>
      : <div>Loading</div>;
  }
}

export default App;
