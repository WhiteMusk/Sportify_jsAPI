import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        paddingBottom: "20px",
        overflow: "auto",
    },
    submitBut: {
        marginTop: "10px",
        float: "right",
    }
});

function RichTextEditor() {
    const classes = useStyles();

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log(data);
    }

    return (
        <Container className={classes.container}>
            <form>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    config={{
                        toolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList', 'outdent', 'indent', '|', 'uploadImage', 'insertTable', 'link', '|', 'undo', 'redo'],
                        image: {
                            resizeUnit: '360px'
                        },
                        indentBlock: {
                            offset: 2,
                            unit: 'em'
                        }
                    }}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={handleCKEditorChange}
                />
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

export default RichTextEditor;