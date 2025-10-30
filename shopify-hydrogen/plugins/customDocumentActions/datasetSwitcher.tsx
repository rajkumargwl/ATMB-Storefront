import {definePlugin} from 'sanity'
import {useState, useEffect} from 'react'
import {Flex, Box} from '@sanity/ui'

export const datasetSwitcherPlugin = definePlugin<{datasets: string[]}>(
    ({datasets}) => ({
      name: 'dataset-switcher',
      studio: {
        components: {
          navbar: (props) => (
            <Flex
              align="center"
              style={{width: '100%'}}
            >
              {/* Dataset Switcher */}
              <div style={{marginRight: '1rem'}}>
                <DatasetSwitcher datasets={datasets} />
              </div>
  
              {/* Default navbar content in full width */}
              <div style={{flex: 1, width: '100%'}}>
                {props.renderDefault(props)}
              </div>
            </Flex>
          ),
        },
      },
    })
  )
  
  
  

  function DatasetSwitcher({datasets}: {datasets: string[]}) {
    const [active, setActive] = useState(datasets[0])
    const [loading, setLoading] = useState(false)
  
    // 🟢 Normalize URL on first load
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('sanity-dataset')
        if (stored && datasets.includes(stored)) {
          setActive(stored)
        }
  
        normalizeToDefault()
      }
    }, [datasets])
  
    const normalizeToDefault = () => {
      const url = new URL(window.location.href)
      const defaultIndex = url.pathname.indexOf('/default')
      if (defaultIndex !== -1 && url.pathname.length > defaultIndex + 8) {
        // trim everything after `/default`
        const cleanPath = url.pathname.substring(0, defaultIndex + 8)
        window.location.replace(`${url.origin}${cleanPath}`)
      }
    }
  
    const handleSwitch = () => {
        const next = active === datasets[0] ? datasets[1] : datasets[0]
      
        if (typeof window !== 'undefined') {
          localStorage.setItem('sanity-dataset', next)
          setActive(next)
          setLoading(true)
      
          setTimeout(() => {
            if (window.location.hostname === 'localhost') {
              window.location.reload()
            } else {
                window.location.replace(
                    "https://www.sanity.io/@oO3YoQvHp/studio/b62lbenvxo5s3cjpq61uz6gh/default/structure"
                  )
              
            }
          }, 300)
        } else {
          console.log('Dataset switcher: window is undefined')
          setTimeout(() => {
            if (window.location.hostname === 'localhost') {
              window.location.reload()
            } else {
                window.location.replace(
                    "https://www.sanity.io/@oO3YoQvHp/studio/b62lbenvxo5s3cjpq61uz6gh/default/structure"
                  )
            }
          }, 300)
        }
      }
      
  
    const isProd = active === 'production'
  
    return (
      <Flex align="center" gap={3}>
        <Box
          onClick={handleSwitch}
          style={{
            width: '60px',
            height: '28px',
            borderRadius: '50px',
            backgroundColor: isProd ? '#e63946' : '#2a9d8f',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: isProd ? '34px' : '2px',
              transition: 'left 0.3s ease',
            }}
          />
        </Box>
  
        <Box
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: isProd ? '#e63946' : '#2a9d8f',
          }}
        >
          {loading ? 'Switching…' : active}
        </Box>
      </Flex>
    )
  }
  
