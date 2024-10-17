import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aiModel">AI Model</Label>
            <Input id="aiModel" placeholder="Select AI model" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="predictionInterval">Prediction Interval</Label>
            <Input id="predictionInterval" placeholder="Enter prediction interval (e.g., 30 days)" />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableAIInsights" />
            <Label htmlFor="enableAIInsights">Enable AI-generated insights</Label>
          </div>
          <Button>Save Settings</Button>
        </form>
      </CardContent>
    </Card>
  )
}