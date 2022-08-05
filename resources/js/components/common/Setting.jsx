import React, { Fragment } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

export const Setting = () => {
    return (
        <Fragment>
            <button className="setting-btn">
                <SettingsIcon />
            </button>

            <div>
                {/* ここに設定内容を記述する */}
            </div>
        </Fragment>
    )
}