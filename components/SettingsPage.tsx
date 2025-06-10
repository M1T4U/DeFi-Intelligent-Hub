
import * as React from 'react';
import Card from './common/Card';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-6">Application Settings</h2>
      
      <Card title="Theme Customization (Coming Soon)">
        <p className="text-text-muted-light dark:text-text-muted-dark">
          Choose from various themes or customize accent colors to personalize your experience.
          Current theme is automatically selected based on your system preference and can be toggled.
        </p>
        <div className="mt-4">
          <label htmlFor="themeToggle" className="flex items-center cursor-pointer">
            <span className="mr-3 text-text-light dark:text-text-dark">Toggle Dark Mode</span>
            <div className="relative">
              <input type="checkbox" id="themeToggle" className="sr-only" checked={document.documentElement.classList.contains('dark')} onChange={() => {
                // This is a mock toggle; actual toggle is in Header.
                // For a real settings page, this would call the useDarkMode hook's toggle function.
                alert("Theme toggle is controlled globally from the header icon.");
              }} />
              <div className="block bg-gray-300 dark:bg-gray-700 w-14 h-8 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform dark:translate-x-full"></div>
            </div>
          </label>
        </div>
      </Card>

      <Card title="Notification Preferences (Coming Soon)">
        <p className="text-text-muted-light dark:text-text-muted-dark">
          Manage alerts for significant portfolio changes, market opportunities, or yield farming reminders.
        </p>
      </Card>

      <Card title="API Key Management (Conceptual)">
        <p className="text-text-muted-light dark:text-text-muted-dark">
          In a production application, you might manage third-party API keys here.
          However, the Gemini API key for this demo is configured via environment variables 
          (<code>process.env.API_KEY</code>) and is not user-configurable through the UI.
        </p>
         <p className="mt-2 text-sm text-accent-light dark:text-accent-dark">
            Note: <code>process.env.API_KEY</code> must be set in the execution environment for AI features.
        </p>
      </Card>

      <Card title="Data Source Configuration (Coming Soon)">
        <p className="text-text-muted-light dark:text-text-muted-dark">
          Select preferred data providers for token prices, protocol information, etc.
        </p>
      </Card>
    </div>
  );
};

export default SettingsPage;
