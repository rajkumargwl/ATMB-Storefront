// plugins/customFooter.tsx
import React from 'react'
import {DatasetSwitcher} from './datasetSwitcher'

export function CustomLayout(props: any) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      {/* Top (default Sanity layout) */}
      <div style={{flex: 1, overflow: 'hidden'}}>
        {props.renderDefault(props)}
      </div>

      {/* Bottom footer bar */}
      <div
        style={{
          borderTop: '1px solid #ddd',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'center', // 👈 change to 'flex-start' or 'flex-end'
          alignItems: 'center',
          background: '#fff',
        }}
      >
        <DatasetSwitcher datasets={['development', 'production']} />
      </div>
    </div>
  )
}
