import styles from './Device.module.css';

function Device(props) {
  return (
    <div className={`${styles.screen} bg-[#ffffffe0] dark:bg-gunMetal`}>
      {props.children}
    </div>
  )
}

export default Device;