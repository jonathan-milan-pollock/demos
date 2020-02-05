import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Layout from 'src/models/Layout';
import { useTranslation } from 'src/hooks/UseTranslation';
import MasterScrollbarContent from 'src/components/master/MasterScrollbarContent';
import MasterFooter from 'src/components/master/MasterFooter';
import TitleContainer from 'src/components/TitleContainer';
import TextContainer from 'src/components/TextContainer';
import Paragraph from 'src/components/Paragraph';

interface Props {
    layout: Layout;
}

AboutMaster.propTypes = {
    layout: PropTypes.object.isRequired
};

export default function AboutMaster({ layout }: Props): JSX.Element {
    const t = useTranslation();
    return (
        <MasterScrollbarContent
            layout={layout}
            renderItem={
                <Fragment>
                    <TitleContainer title={t.aboutTitle} />
                    <TextContainer
                        title={t.aboutMagenicMastersReactTitle}
                        renderItem={
                            <Paragraph text={t.aboutMagenicMastersReact} />
                        }
                    />
                    <MasterFooter />
                </Fragment>
            }
        />
    );
}
