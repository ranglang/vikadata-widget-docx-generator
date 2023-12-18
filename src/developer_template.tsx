import React from 'react';
import { useDatasheet } from '@apitable/widget-sdk';
import { DocxGenerator } from './docx_generator';
import { Setting } from './setting';
// import sample from "./sample.png";

export const WidgetDeveloperTemplate: React.FC = () => {

  const datasheet = useDatasheet()

  // 校验用户是否有新增记录的权限，从而判断用户对表格是否只读权限
  const permission = datasheet?.checkPermissionsForAddRecord()

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--defaultBg)', borderTop: '1px solid var(--lineColor)' }}>
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '0 8px'}}>
        <DocxGenerator />
      </div>
      {permission?.acceptable && <Setting/>}

    </div>
  );
};
