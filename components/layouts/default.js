
import Head from 'next/head';

import { Grid, GridColumn, GridRow, Header } from 'semantic-ui-react';

export default function DefaultLayout({ children }) {
    return (
        <>
            <Head>
                <title>p2ploans.co.uk</title>
            </Head>
            <Grid columns={1}>
                <GridRow>
                    <GridColumn>
                        <div style={{padding: '16px'}}>
                            <Header as="h1" block color="grey">p2ploans.co.uk</Header>
                        </div>
                    </GridColumn>
                </GridRow>
            </Grid>
            <div style={{padding: '16px'}}>
                { children }
            </div>
        </>
    )
}