function AudioPlayer({

    audioURL

}){

    return(

        <div className="audio-player-card">

            <h3>

                🎵 Audio Player

            </h3>

            <audio

                controls

                src={audioURL}

                style={{width:"100%"}}

            />

        </div>

    );

}

export default AudioPlayer;