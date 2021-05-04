import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useQuery, useMutation } from '@apollo/client';
import { Host_EventBasicInfo_QUERY, Edit_Event_MUTATION } from '../graphql';

const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        paddingBottom: "20px",
    },
    inputfield: {
        marginBottom: "20px",
    },
    submitBut: {
        float: "right",
    },
    releaseBut: {
        float: "right",
        marginRight: "10px",
    },
    dateText: {
        display: "inline",
    }
});

function EventBasicInfo(props) {
    const classes = useStyles();
    const [img, setImg] = useState("");
    const [title, setTitle] = useState("");
    const [highlight, setHighlight] = useState("");
    const [date, setDate] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [location, setLocation] = useState("");
    const [fee, setFee] = useState("");

    const { loading, error, data, refetch } = useQuery(Host_EventBasicInfo_QUERY, { variables: { eventId: props.eventID } });
    if (error) console.log(error);

    useEffect(() => {
        if (!loading) {
            setTitle(data.getEvent.title);
            if (data.getEvent.highlight !== null)
                setHighlight(data.getEvent.highlight);
            if (data.getEvent.date !== null)
                setDate(data.getEvent.date);
            if (data.getEvent.dateEnd !== null)
                setDateEnd(data.getEvent.dateEnd);
            if (data.getEvent.location !== null)
                setLocation(data.getEvent.location);
            if (data.getEvent.fee !== null)
                setFee(data.getEvent.fee);
        }
    },
        [data],
    );

    const [editEvent] = useMutation(Edit_Event_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var isSuccess = true;
        if (date === "") {
            try {
                await editEvent({
                    variables: {
                        _id: props.eventID,
                        title: title,
                        highlight: highlight,
                        location: location,
                        fee: Number(fee)
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else if (dateEnd === "") {
            try {
                await editEvent({
                    variables: {
                        _id: props.eventID,
                        title: title,
                        highlight: highlight,
                        date: date,
                        location: location,
                        fee: Number(fee)
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else {
            try {
                await editEvent({
                    variables: {
                        _id: props.eventID,
                        title: title,
                        highlight: highlight,
                        date: date,
                        dateEnd: dateEnd,
                        location: location,
                        fee: Number(fee)
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        }


        if (isSuccess) {
            alert("編輯成功！");
            refetch();
        } else {
            alert("編輯失敗！請再試一次");
        }
    }

    const fileLoad = e => {
        setImg(e.target.result) // 讀取到DataURL後，儲存在result裡面，指定為img
    };

    const handleSelectImg = e => {
        const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
        const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
        fileReader.addEventListener("load", fileLoad);
        fileReader.readAsDataURL(file); // 讀取完檔案後，變成URL
    };

    return (
        <Container className={classes.container}>
            <form>
                <Typography><FormattedMessage id="eventBasicInfo.name" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Name"
                    value={title}
                    onInput={e => setTitle(e.target.value)} />
                {/* <Typography><FormattedMessage id="eventBasicInfo.pic" /></Typography>
                <input type="file" onChange={handleSelectImg} className={classes.inputfield} />
                <img width="360px" src={img} /> */}
                <Typography><FormattedMessage id="eventBasicInfo.highlight" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Highlight"
                    value={highlight}
                    onInput={e => setHighlight(e.target.value)} />
                <Typography><FormattedMessage id="eventBasicInfo.date" /></Typography>
                <TextField
                    type="date"
                    className={classes.inputfield}
                    value={date.slice(0, 10)}
                    onInput={e => setDate(e.target.value)}
                />
                <Typography className={classes.dateText}> ~ </Typography>
                <TextField
                    type="date"
                    className={classes.inputfield}
                    value={dateEnd.slice(0, 10)}
                    onInput={e => setDateEnd(e.target.value)}
                />
                <Typography><FormattedMessage id="eventBasicInfo.location" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Place"
                    value={location}
                    onInput={e => setLocation(e.target.value)} />
                <Typography ><FormattedMessage id="eventBasicInfo.fee" /></Typography>
                <TextField className={classes.inputfield} label="Registery Fee"
                    value={fee}
                    onInput={e => setFee(e.target.value)} />
                {/* <Typography ><FormattedMessage id="eventBasicInfo.public" /></Typography>
                <FormControlLabel
                    control={
                        <Switch
                            // checked={state.checkedB}
                            // onChange={handleChange}
                            color="primary"
                        />
                    }
                    label=""
                /> */}

                <Button className={classes.submitBut} variant="contained" color="default"
                    type="submit"
                    onClick={handleSubmit}
                >
                    <FormattedMessage id="eventBasicInfo.save" />
                </Button>

                {/* <Button className={classes.releaseBut} variant="contained" color="default"
                // onClick={handleSubmit}
                >
                    <FormattedMessage id="eventBasicInfo.release" />
                </Button> */}
            </form>
        </Container>
    );
}

export default EventBasicInfo;