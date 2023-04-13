import * as LiveShare from '@microsoft/live-share';
import * as BABYLON from 'babylonjs';
import * as React from 'react';

// a React app that uses LiveShare to start a session and share a Babylon.js scene
export class App extends React.Component {
    private _session: LiveShare.LiveShare;
    private _scene: BABYLON.Scene;

    public componentDidMount() {
        // start a LiveShare session
        this._session = await LiveShare.startSession();

        // create a Babylon.js scene
        this._scene = new BABYLON.Scene(engine);

        // share the scene
        await this._session.share(this._scene);
    }

    public componentWillUnmount() {
        // stop the LiveShare session
        this._session.stop();
    }

    public render() {
        return <div id="renderCanvas" />;
    }
}
