import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
    container: {
        marginTop: "20px",
    },
    inputfield: {
        marginBottom: "20px",
    },
    submitBut: {
        float: "right",
    }
});

function EventBasicInfo() {
    const classes = useStyles();
    const [img, setImg] = useState("");

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
                <TextField fullWidth className={classes.inputfield} label="Name" />
                <Typography><FormattedMessage id="eventBasicInfo.pic" /></Typography>
                <input type="file" onChange={handleSelectImg} className={classes.inputfield} />
                <img width="360px" src={img} />
                <Typography><FormattedMessage id="eventBasicInfo.date" /></Typography>
                <TextField
                    type="date"
                    className={classes.inputfield}
                // value={birthday}
                // onInput={e => setBirthday(e.target.value)}
                />
                <Typography><FormattedMessage id="eventBasicInfo.location" /></Typography>
                <TextField fullWidth className={classes.inputfield} label="Place" />
                <Typography ><FormattedMessage id="eventBasicInfo.bank" /></Typography>
                <TextField className={classes.inputfield} label="Bank Code" />
                <TextField className={classes.inputfield} label="Bank Account" />
                <Typography ><FormattedMessage id="eventBasicInfo.fee" /></Typography>
                <TextField className={classes.inputfield} label="Registery Fee" />

                <Button className={classes.submitBut} variant="contained" color="default"
                    type="submit"
                // onClick={handleSubmit}
                >
                    儲存修改
                </Button>
            </form>
        </Container>
    );
}

export default EventBasicInfo;