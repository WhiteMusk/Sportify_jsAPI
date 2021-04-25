import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
                <Typography>賽事名稱</Typography>
                <TextField fullWidth className={classes.inputfield} label="Name" />
                <Typography>賽事圖片</Typography>
                <input type="file" onChange={handleSelectImg} className={classes.inputfield} />
                <img width="360px" src={img} />
                <Typography>比賽日期</Typography>
                <TextField
                    type="date"
                    className={classes.inputfield}
                // value={birthday}
                // onInput={e => setBirthday(e.target.value)}
                />
                <Typography>地點</Typography>
                <TextField fullWidth className={classes.inputfield} label="Place" />
                <Typography >匯款資訊(銀行代碼、帳號)</Typography>
                <TextField className={classes.inputfield} label="Bank Code" />
                <TextField className={classes.inputfield} label="Bank Account" />
                <Typography >聯絡資訊(負責人/機構、電話、Email)</Typography>
                <TextField className={classes.inputfield} label="Name" />
                <TextField className={classes.inputfield} label="Phone" />
                <TextField className={classes.inputfield} label="Email" />

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