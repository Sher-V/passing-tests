import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "./styles";

export const TestCard = ({test, deleteTest}) => {
    const classes = useStyles();

    return (
        <Grid key={test.id} item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant={"h6"}>{test.title}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Link passHref={true} href={"/test/[id]"} as={`/test/${test.id}`}>
                        <Button color={"primary"}>Редактировать тест</Button>
                    </Link>
                    <IconButton
                        className={classes.delete}
                        onClick={() => deleteTest(test.id)}
                        color={"primary"}
                    >
                        <DeleteIcon fontSize={"large"} />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}
