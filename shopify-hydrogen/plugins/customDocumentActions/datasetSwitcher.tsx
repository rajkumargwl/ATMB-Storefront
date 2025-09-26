import {definePlugin} from 'sanity'
import {useState, useEffect} from 'react'
import {Flex, Box} from '@sanity/ui'

export const datasetSwitcherPlugin = definePlugin<{datasets: string[]}>(
  ({datasets}) => {
    return {
      name: 'dataset-switcher',
      studio: {
        components: {
          layout: (props) => (
            <>
              <div style={{marginRight: '1rem'}}>
                <DatasetSwitcher datasets={datasets} />
              </div>
              {props.renderDefault(props)}
            </>
          ),
        },
      },
    }
  }
)

export function DatasetSwitcher({datasets}: {datasets: string[]}) {
  const [active, setActive] = useState(datasets[0])
  const [loading, setLoading] = useState(false)

  // Load from localStorage (client only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sanity-dataset')
      if (stored && datasets.includes(stored)) {
        setActive(stored)
      }
    }
  }, [datasets])

  const handleSwitch = () => {
    const next = active === datasets[0] ? datasets[1] : datasets[0]
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanity-dataset', next)
      setActive(next)
      setLoading(true)
      setTimeout(() => window.location.reload(), 300)
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
