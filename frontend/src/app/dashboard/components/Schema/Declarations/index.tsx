// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'

// Modals
import CreateFieldModal from '@modals/CreateFieldModal'

// Styles
import styles from './Declarations.scss'

interface iProps {
  declarations: any
  model: any
  enumerations: any
}

const Declarations: FC<iProps> = ({ declarations, model, enumerations }): ReactElement => {
  // Local state
  const [isOpen, setIsOpen] = useState(false)
  const [fieldType, setFieldType] = useState('')

  // Method to open modal
  const handleModal = (): void => setIsOpen(!isOpen)

  return (
    <>
      {fieldType && (
        <CreateFieldModal
          label={`Create new ${fieldType} Field`}
          isOpen={isOpen}
          onClose={handleModal}
          options={{
            data: {
              enumerations,
              type: fieldType,
              modelIdentifier: model.identifier,
              appId: model.appId
            },
            position: 'top',
            height: fieldType === 'Dropdown' ? '700px' : '620px',
            width: '600px'
          }}
        />
      )}

      <section className={styles.declarations}>
        <h3>Fields</h3>

        <ul>
          {declarations.map((field: any) => {
            if (field.declaration === 'Dropdown' && enumerations.length === 0) {
              return <li />
            }

            return (
              <li key={field.id}>
                <div>
                  <p>{field.declaration}</p>

                  <div
                    className={styles.widgetOption}
                    title={field.description}
                    onClick={(): void => {
                      setFieldType(field.declaration)
                      handleModal()
                    }}
                  >
                    <i className={field.icon} style={{ color: field.color }} />
                    <span>{field.declaration}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default memo(Declarations)
