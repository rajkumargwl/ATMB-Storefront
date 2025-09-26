import {definePlugin} from 'sanity'
import {useState} from 'react'
import {Flex, Box} from '@sanity/ui'

export const datasetSwitcherPlugin = definePlugin<{datasets: string[]}>(
  ({datasets}) => {
    return {
      name: 'dataset-switcher',
      studio: {
        components: {
          layout: (props) => {
            return (
              <>
                <div style={{marginRight: '1rem'}}>
                  <DatasetSwitcher datasets={datasets} />
                </div>
                {props.renderDefault(props)}
              </>
            )
          },
        },
      },
    }
  }
)

export function DatasetSwitcher({datasets}: {datasets: string[]}) {
  const stored =
    typeof window !== 'undefined'
      ? localStorage.getItem('sanity-dataset')
      : null

  const [active, setActive] = useState<string>(stored || datasets[0])
  const [loading, setLoading] = useState(false)

  const handleSwitch = () => {
    const next = active === datasets[0] ? datasets[1] : datasets[0]
    localStorage.setItem('sanity-dataset', next)
    setActive(next)
    setLoading(true)
    setTimeout(() => {
      window.location.reload()
    }, 500) // short delay so toggle shows instantly before reload
  }

  const isProd = active === 'production'

  return (
    <Flex align="center" gap={3}>
      {/* Toggle switch */}
      <Box
        onClick={handleSwitch}
        style={{
          width: '60px',
          height: '28px',
          borderRadius: '50px',
          backgroundColor: isProd ? '#e63946' : '#2a9d8f',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
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
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        />
      </Box>

      {/* Label */}
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
