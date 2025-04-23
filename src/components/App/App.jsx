import { useState, useEffect } from 'react'
import Description from '../Description/Description'
import Feedback from '../Feedback/Feedback'
import Options from '../Options/Options'
import Notification from '../Notification/Notification'
import './App.css'

export default function App() {

  const [feedback, setFeedback] = useState(() => {
    const currentFeedback = localStorage.getItem("saved-reviews")
    if (currentFeedback) {
      return JSON.parse(currentFeedback)
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    }
  })
  useEffect(() => {
    window.localStorage.setItem("saved-reviews", JSON.stringify(feedback))
  }, [feedback])

  const updateFeedback = feedbackType => {
    if (feedbackType === 'reset') {
      setFeedback({ good: 0, neutral: 0, bad: 0 });
    } else {
      setFeedback(currentFeedback => ({
        ...currentFeedback, [feedbackType]: currentFeedback[feedbackType] + 1,
      }))
    }
  }

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </>
  )
}
