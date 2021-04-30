import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useQuery, useMutation } from '@apollo/client';
import { Host_RichEditor_QUERY, Event_RichEditor_MUTATION } from '../graphql';

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

function RichTextEditor(props) {
    const classes = useStyles();
    const [content, setContent] = useState("");

    const { loading, error, data, refetch } = useQuery(Host_RichEditor_QUERY, { variables: { eventId: props.eventID } });
    if (error) console.log(error);

    useEffect(() => {
        setContent("")
        if (!loading) {
            if (props.tab === 2 && data.getEvent.description !== null)
                setContent(data.getEvent.description);
            if (props.tab === 3 && data.getEvent.registrationInfo !== null)
                setContent(data.getEvent.registrationInfo);
            if (props.tab === 4 && data.getEvent.trafficInfo !== null)
                setContent(data.getEvent.trafficInfo);
            if (props.tab === 5 && data.getEvent.prize !== null)
                setContent(data.getEvent.prize);
        }
    },
        [data, props.tab],
    );

    const [saveContent] = useMutation(Event_RichEditor_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var isSuccess = true;
        if (props.tab === 2) {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        description: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else if (props.tab === 3) {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        registrationInfo: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else if (props.tab === 4) {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        trafficInfo: content
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }
        } else {
            try {
                await saveContent({
                    variables: {
                        _id: props.eventID,
                        prize: content
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

    const handleCKEditorChange = (event, editor) => {
        setContent(editor.getData())
    }

    return (
        <Container className={classes.container}>
            <form>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
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
                    onClick={handleSubmit}
                >
                    儲存修改
                </Button>
            </form>
        </Container>
    );
}

export default RichTextEditor;